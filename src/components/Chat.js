import {
  BellIcon,
  ChatIcon,
  EmojiHappyIcon,
  GiftIcon,
  HashtagIcon,
  InboxIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../features/channelSlice";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const Chat = () => {
  const channelId = useSelector(selectChannelId);
  console.log("lahmar", channelId);
  const channelName = useSelector(selectChannelName);
  console.log("ali", channelName);
  const [user] = useAuthState(auth);
  const inputRef = useRef("");
  const chatRef = useRef(null);
  const [messages] = useCollection(
    channelId &&
      db
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  const scrollToBottom = (e) => {
    e.preventDefault();
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputRef.current.value !== "") {
      db.collection("channels").doc(channelId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: inputRef.current.value,
        name: user?.displayName,
        photoURL: user?.photoURL,
        email: user?.email,
      });
    }
    inputRef.current.value = "";
    scrollToBottom();
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashtagIcon className="h-6 text-discord_chatHeaderIcon" />
          <h4 className="text-white font-semibold"> {channelName} </h4>
        </div>
        <div className="flex space-x-3">
          <BellIcon className="icon" />
          <ChatIcon className="icon" />
          <UsersIcon className="icon" />
          <div className="flex bg-discord_chatHeaderInputBg text-xs p-1 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none text-white pl-1 placeholder-discord_chatHeaderIcon"
            />
            <SearchIcon className="h-4 text-discord_chatHeaderIcon m-1" />
            <InboxIcon className="icon" />
            <QuestionMarkCircleIcon className="icon" />
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {/* messages  */}

        <div ref={chatRef} className="pb-16 "></div>
      </main>
      <div className="flex items-center p-2.5 bg-discord_chatInputBg mx-5 mb-7 rounded-lg">
        <PlusCircleIcon className="icon mr-4 " />
        <form className="fex-grow">
          <input
            type="text"
            disabled={!channelId}
            placeholder={
              channelId ? `Message #${channelName}` : "select a channel"
            }
            className="bg-transparent focus:outline-none text-discord_chartInputText w-full placeholder-discord_chatHeaderIcon text-sm"
            ref={inputRef}
          />
          <button hidden type="submit" onClick={sendMessage} className="">
            Send
          </button>
        </form>
        <GiftIcon className="icon mr-2" />
        <EmojiHappyIcon className="icon" />
      </div>
    </div>
  );
};

export default Chat;
