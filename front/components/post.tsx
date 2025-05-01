import { Button } from "./ui/button"
import Spinner from "./ui/spinner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { FetchProxy } from "../proxies/fetch";

import { useState } from "react";

type User = {
    id_user: number
    name: string
    password: string
}

type PostData = {
    id_post: number
    id_user: number
    content: string
}

type UserMap = {
    [id: number]: string;
  };

type Data = {
    post_data: Array<PostData>
    users: UserMap
    id_user: number
}

export default function Post(
    { post_data, users, id_user }: Data
) {

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-6 p-6">
        {
            post_data.map((post) => (
                <div key={post.id_post}>
                    <div className="font-bold text-gray-800">
                        {users[post.id_user]}
                    </div>

                    <div className="text-gray-600 mb-4 ml-4">
                        {post.content}
                    </div>

                    <hr className="mt-5 mb-5"/>
                </div>
            ))
          }
        </div>
    )
}
  