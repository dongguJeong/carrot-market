'use client'
import { saveMessage } from "@/app/chats/[id]/action";
import { InitialMessages } from "@/app/chats/[id]/page"
import { formatDate } from "@/lib/utils";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

const SUPABASE_PUBLIC_APIKEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5ZWdrYXplcm5qcGJ0aGtvdXpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0OTIxNTQsImV4cCI6MjAzODA2ODE1NH0.SmYXqSyMorNBDNqfBn2Ao3EYozCMZg7oolRx-ilZNa4";
const SUPABASE_URL ="https://lyegkazernjpbthkouzh.supabase.co";

interface ChatMessageListProps{
    initialMessages : InitialMessages;
    userId : number;
    chatRoomId : string;
    username : string;
}

export default function ChatMessageList({initialMessages, userId, chatRoomId,username}
    : ChatMessageListProps){

    const [messages, setMessages] = useState(initialMessages);
    const [typing , setTyping] = useState("");
    const channel = useRef<RealtimeChannel>();

    useEffect(() => {
        const client = createClient(SUPABASE_URL,SUPABASE_PUBLIC_APIKEY);
        channel.current =  client.channel(`room-${chatRoomId}`);
        channel.current.on(
            'broadcast',
            {event : "message"},
            (payload => {
                setMessages(prev => [...prev, payload.payload]);
            }),
        ).subscribe();

        return () => {
            channel.current?.unsubscribe();
        }
    },[]);

    const onSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        setMessages(prev => [...prev , {
            id: Date.now(),
            payload: typing, 
            created_at: new Date(),
            userId, 
            user: { username: "string", },
        }]);
         channel.current?.send(
           { type : "broadcast",
            event :  "message",
            payload : {id: Date.now(),created_at: new Date(), payload : typing,userId, username}}
        );
        await saveMessage(typing, chatRoomId);
        setTyping("");
    } 

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTyping(e.target.value);
    }

    return (
        <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
            {messages.map(message => (
                <div key={message.id} className={`flex gap-2 items-start ${message.userId === userId ? "justify-end" : ""}`}>
                    {message.userId === userId ? null : <div className="size-10 rounded-full bg-neutral-400"/> }
                    <div className={`flex flex-col gap-2  ${message.userId === userId ? "items-end" : ""}`}>
                        <span className="bg-orange-500 p-2.5 rounded-md text-white">
                            {message.payload}
                        </span>
                        <span className="text-xs">
                            { formatDate(message.created_at.toString()) }
                        </span>
                    </div>
                </div>
            ))}
           <form className="flex relative" onSubmit={onSubmit}>
            <input onChange={onChange}
                value={typing}
                className="bg-transparent rounded-full w-full h-10 focus:outline px-5 ring-2
                focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none
                placeholder:text-neutral-400"
            />
           </form> 
        </div>
        
    )
}