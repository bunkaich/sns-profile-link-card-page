import React from "react";
import { Link, ProfileData } from "../types";
import { User, Upload } from "lucide-react";

interface ProfileCardProps {
  links: Link[];
  profileData: ProfileData;
  updateProfileData?: (data: Partial<ProfileData>) => void;
  handleIconUpload?: (file: File) => Promise<void>;
  isAdminView?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  links,
  profileData,
  updateProfileData,
  handleIconUpload,
  isAdminView,
}) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && handleIconUpload) {
      await handleIconUpload(file);
    }
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative mb-4">
          {profileData.userIcon ? (
            <img
              src={profileData.userIcon}
              alt="ユーザーアイコン"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
          ) : (
            <User className="w-32 h-32 text-gray-400 bg-gray-100 rounded-full p-6" />
          )}
          {isAdminView && (
            <>
              <label
                htmlFor="profile-icon-upload"
                className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
              >
                <Upload className="w-5 h-5 text-white" />
              </label>
              <input
                id="profile-icon-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </>
          )}
        </div>
        {isAdminView ? (
          <>
            <input
              type="text"
              value={profileData.userName}
              onChange={(e) =>
                updateProfileData?.({ userName: e.target.value })
              }
              className="text-xl font-semibold text-center mb-2 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
              placeholder="ユーザー名"
            />
            <textarea
              value={profileData.userComment}
              onChange={(e) =>
                updateProfileData?.({ userComment: e.target.value })
              }
              className="text-sm text-gray-600 text-center w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none resize-none"
              placeholder="自己紹介"
              rows={2}
            />
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-center mb-2">
              {profileData.userName}
            </h2>
            <p className="text-sm text-gray-600 text-center">
              {profileData.userComment}
            </p>
          </>
        )}
      </div>
      <div className="space-y-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gradient-to-r from-[#46B3E0] to-[#B8E9F6] rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center mb-2 text-white">
              <img
                src={link.icon}
                alt={link.name}
                className="w-10 h-10 mr-3 rounded-full shadow-sm"
              />
              <span className="font-medium text-lg">{link.name}</span>
            </div>
            {link.comment && (
              <p className="text-sm text-white ml-13 mt-2 italic">
                {link.comment}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
