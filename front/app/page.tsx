"use client"

import { useState, useEffect } from "react";
import { getCookie, deleteCookie } from 'cookies-next/client';

import { FetchProxy } from "../proxies/fetch";
import Register from "@/components/register";
import Spinner from "@/components/ui/spinner";

export default function Home() {
  const [data, setData] = useState([])
  const [login, setLogin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [id_user, set_id_user] = useState(-1)
  const [users, setUsers] = useState({});

  const getUsers = async () => {
    try {
      const response = await FetchProxy.request("users");
      const userDict = Object.fromEntries(response.map((user: any) => [user.id_user, user.name]));
      setUsers(userDict);
    } catch (error) {
      console.error("Failed to fetch users", error);
    };
  }
  
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
            login == false ? <Register/> : null
          )
      }
    </div>
  );
}
