"use client"

import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from 'cookies-next/client';

import Post from "@/components/post";
import Register from "@/components/register";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { FetchProxy } from "../proxies/fetch";

export default function Home() {
  const [data, setData] = useState([])
  const [login, setLogin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [id_user, set_id_user] = useState(-1)
  const [users, setUsers] = useState({});

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await FetchProxy.request("users");
      const userDict = Object.fromEntries(response.map((user: any) => [user.id_user, user.name]));
      setUsers(userDict);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cookie = getCookie("session");

    if (!cookie) {
      setLogin(false);
      setLoading(false);
      return;
    }

    const init = async () => {
      try {
        const posts = await FetchProxy.request("post");
        setData(posts);

        const cookieData = JSON.parse(cookie);
        set_id_user(cookieData.id_user);

        setLogin(true);
        await getUsers();
      } catch (error) {
        console.error("Error loading data:", error);
        setLogin(false);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <div className={`${login == false ? "flex align-center items-center h-[90vh] justify-center" : ""}`}>
      { 
        loading == true ? <Spinner/> : (
            login == false ? <Register/> : (
                id_user != -1 ? 
                  <div>
                    <Button onClick={() => {
                        deleteCookie("session")

                        window.location.reload()
                      }} 
                      className="float-right m-5"
                    >
                        Logout
                    </Button>
                    <Post 
                      post_data={data} 
                      users={users}
                      id_user={id_user}
                    /> 
                  </div> : null
            ) 
          )
      }
    </div>
  );
}
