import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserView from "./components/UserView";
import AdminView from "./components/AdminView";
import { createClient } from "@supabase/supabase-js";
import { Link, ProfileData } from "./types";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [title, setTitle] = useState<string>("SNSプロフィールリンクカード");
  const [links, setLinks] = useState<Link[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>({
    userIcon: "",
    userName: "",
    userComment: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("profile_data")
        .select("*")
        .single();

      if (error) throw error;

      setTitle(data.title || "SNSプロフィールリンクカード");
      setLinks(data.links || []);
      setProfileData({
        userIcon: data.user_icon || "",
        userName: data.user_name || "",
        userComment: data.user_comment || "",
      });
    } catch (error) {
      console.error("データの読み込み中にエラーが発生しました:", error);
    }
  };

  const saveData = async (
    newTitle: string,
    newLinks: Link[],
    newProfileData: ProfileData
  ) => {
    try {
      const { error } = await supabase.from("profile_data").upsert({
        id: 1, // 常に同じIDを使用
        title: newTitle,
        links: newLinks,
        user_icon: newProfileData.userIcon,
        user_name: newProfileData.userName,
        user_comment: newProfileData.userComment,
      });

      if (error) throw error;

      // データを更新
      setTitle(newTitle);
      setLinks(newLinks);
      setProfileData(newProfileData);
    } catch (error) {
      console.error("データの保存中にエラーが発生しました:", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <UserView title={title} links={links} profileData={profileData} />
          }
        />
        <Route
          path="/admin"
          element={
            <AdminView
              title={title}
              links={links}
              profileData={profileData}
              saveData={saveData}
              supabase={supabase}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
