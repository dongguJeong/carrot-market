import db from "@/lib/db";
import {getSession} from "@/lib/session";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "@/components/like-button";

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}

const getCachedPost = nextCache(getPost,["post-detail"],{
    tags :["post-detail"],
    revalidate : 60
});

async function getLikeStatus(postId: number, userId : number) {
 
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where : {
        postId
    }
  });

  return {
    likeCount, isLiked :Boolean(isLiked)
  }
}

function getCachedLikeCache(postId :number, userId :number){
const cached = nextCache(getLikeStatus,["like-cache"],
    {tags : [`like-status-${postId}`],
});
return cached(postId,userId); 
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }

  const session = await getSession();

  const {likeCount,isLiked} = await getCachedLikeCache(id, Number(session.id));
  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        {post.user.avatar ? <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={post.user.avatar}
          alt={post.user.username}
        />
        :
        <div className="size-12 rounded-full bg-neutral-500"></div>
        }
        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span>{formatDate(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
      </div>
    </div>
  );
}