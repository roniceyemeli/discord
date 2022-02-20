import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect } from "react-router-dom";
import { auth, db } from "../../firebase";
import messages from "../../assets/messages.png";
import ServerIcons from "../ServerIcons";
import {
  ChevronDownIcon,
  CogIcon,
  MicrophoneIcon,
  PhoneIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { useCollection } from "react-firebase-hooks/firestore";
import Channel from "../Channel";
import Chat from "../Chat";

const Home = () => {
  const [user] = useAuthState(auth);
  console.log("first", user);

  // how to access all of the channels
  const [channels] = useCollection(db.collection("channels"));

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      // firebase V9
      // addDoc(collection(db, "channels"), {
      //   channelName: channelName,
      // });
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  return (
    <>
      {!user && <Redirect to="/" />}
      <div className="flex h-screen">
        <div className="flex flex-col space-y-3 bg-discord_serversBg p-3 min-w-max">
          <div className="server-default hover:bg-discord_purple">
            <img src={messages} alt="" className="h-5 bg-black" />
          </div>
          <hr className=" border-gray-700 border w-8 mx-auto" />
          <ServerIcons image="https://rb.gy/qidcpp" />
          <ServerIcons image="https://rb.gy/zxo0lz" />
          <ServerIcons image="https://rb.gy/qidcpp" />
          <ServerIcons image="https://rb.gy/zxo0lz" />
          <div className="server-default hover:bg-discord_green group">
            <PlusIcon className="text-discord_green h-7 group-hover:text-white" />
          </div>
        </div>

        <div className="bg-discord_channelsBg flex flex-col min-w-max">
          <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-discord_serverNameHoverBg cursor-pointer">
            Official PAPA Server... <ChevronDownIcon className="h-5 ml-2 " />
          </h2>
          <div className="text-discord_channel flex-grow overflow-y-scroll scrollbar-hide">
            <div className="flex items-center p-2 m-2">
              <ChevronDownIcon className="h-3 mb-2" />
              <h4 className="font-semibold">Channels</h4>
              <PlusIcon
                className="h-6 ml-auto cursor-pointer hover:text-white"
                onClick={handleAddChannel}
              />
            </div>
            <div className="flex flex-col space-y-2 px-2 mb-4">
              {channels?.docs.map((doc) => {
                return (
                  <Channel
                    key={doc.id}
                    id={doc.id}
                    channelName={doc.data().channelName}
                  />
                );
              })}
            </div>
          </div>

          <div className="bg-gray-700 p-2 flex justify-between items-center space-x-8">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-white h-7 b-2 cursor-pointer hover:bg-discord_iconHoverBg rounded"
                onClick={() => auth.signOut()}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <div className="">
                <h3 className="text-white font-normal text-sm">
                  {user?.displayName}
                </h3>
                <span className="text-gray-400 block text-xs">
                  #{user?.uid.substring(0, 4)}
                </span>
              </div>
              <div className=" text-gray-400 flex items-center cursor-pointer">
                <div className="hover:bg-red p-2 rounded">
                  <MicrophoneIcon className="h-5 icon hover:bg-discord_iconoverBg rounded" />
                </div>
                <div className="hover:bg-red p-2 rounded">
                  <PhoneIcon className="h-5 icon hover:bg-discord_iconoverBg rounded" />
                </div>
                <div className="hover:bg-red p-2 rounded">
                  <CogIcon className="h-5 icon hover:bg-discord_iconoverBg rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-discord_chatBg flex-grow">
          <Chat />
        </div>
      </div>
    </>
  );
};

export default Home;
