import { NextRequest, NextResponse } from "next/server";
import {getSession} from "./lib/session";

interface Routes{
    [key:string] : boolean;
}

const publicOnlyUrls : Routes = {
    "/" : true,
    "/login" : true,
    "/sms" : true,
    "/create-account" : true,
    "/github/start" : true,
    "/github/complete" : true,
}

// 모든 single request에 대해 발생
export async function middleware(request:NextRequest){
    const session = await getSession();
    const exists  = publicOnlyUrls[request.nextUrl.pathname];
    if(!session.id){
        if(!exists){
            return NextResponse.redirect(new URL("/",request.url));
        }
    }
    else{
        // if(exists){
        //     return NextResponse.redirect(new URL("/products",request.url));
        // }
    }
}

// 미들웨어가 언제 실행될 지 설정
export const config = {
    matcher : ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}