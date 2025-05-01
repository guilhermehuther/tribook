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
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState("")

    async function handlePost() {
        setLoading(true);
        try {
            const response = await FetchProxy.request("post", "POST", {
                content: post,
                id_user,
            });
            console.log(response);
        } catch (err) {
            console.error("Post failed", err);
        } finally {
            setLoading(false);
            window.location.reload();
        }
    }
    
    async function handleInteraction(
        is_like: boolean,
        id_user: number,
        id_post: number,
    ) {
        setLoading(true);
        try {
            const response = await FetchProxy.request("interaction", "POST", {
            is_like,
            id_post,
            id_user,
            });
            console.log(response);
        } catch (err) {
            console.error("Interaction failed", err);
        } finally {
            setLoading(false);
            window.location.reload();
        }
    }
    
    async function handleExcluir(id_post: number) {
        setLoading(true);
        try {
            const response = await FetchProxy.request(`post/${id_post}`, "DELETE");
            console.log(response);
        } catch (err) {
            console.error("Delete failed", err);
        } finally {
            setLoading(false);
            window.location.reload();
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-6 p-6">
        {
            post_data.map((post) => (
                <div key={post.id_post}>
                    <div className="flex items-center justify-between items-center mb-2">
                        <div className="font-bold text-gray-800">
                            {users[post.id_user]}
                        </div>
                        { 
                            post.id_user == id_user ? (
                                <div className="flex items-center justify-between space-x-2">
                                    <Button onClick={() => handleExcluir(post.id_post)} size="sm" className="bg-red-500 hover:bg-red-600 active:bg-red-700">
                                        {loading ? <Spinner/> : <p>Excluir</p>}
                                    </Button>
                                </div>
                            ) : null
                        }
                    </div>

                    <div className="text-gray-600 mb-4 ml-4">
                        {post.content}
                    </div>

                    <div className={`flex items-center justify-between ${post.id_user == id_user ? "flex-row-reverse": ""}`}>
                    {
                        post.id_user != id_user ? (
                                <div>
                                    <Button onClick={() => handleInteraction(true, id_user, post.id_post)}  size="sm" className="bg-green-500 hover:bg-green-600 active:bg-green-700">
                                        {loading ? <Spinner/> : <p>Like</p>}
                                    </Button>
                                    <Button onClick={() => handleInteraction(false, id_user, post.id_post)}  size="sm" className="bg-red-500 hover:bg-red-600 active:bg-red-700 ml-2">
                                        {loading ? <Spinner/> : <p>Dislike</p>}
                                    </Button>
                                </div>
                        ): null
                    }
                    </div>

                    <hr className="mt-5 mb-5"/>
                </div>
            ))
          }
        <div className="flex justify-center">
            <Dialog>
                <DialogTrigger asChild>                
                    <Button className="rounded-full">Criar Postagem</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Postagem</DialogTitle>
                    </DialogHeader>

                    <Input onChangeCapture={(e) => {setPost(e.currentTarget.value)}} placeholder="conteúdo"/>
                    <Button onClick={handlePost}>{loading ? <Spinner/> : <p>Criar</p>}</Button>
                </DialogContent>
            </Dialog>
        </div>
      </div>
    )
}
  