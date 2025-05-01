"use client"

import { useState, useEffect } from "react";

import { FetchProxy } from "../proxies/fetch";

export default function Home() {
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
      getUsers().then((e) => {}).catch((e) => {})
  }, []);
  
  return (
    <div>
      <p>
        {users}
      </p>
    </div>
  );
}
