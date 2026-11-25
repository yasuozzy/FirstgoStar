import { defineStore } from "pinia";
import { getRemoteUser } from "@/api";
import { getStorage, removeStorage, setStorage, storageKeys } from "@/utils/storage";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  username?: string;
}

interface UserState {
  token: string;
  profile: UserProfile | null;
  loading: boolean;
}

function getInitialProfile() {
  return getStorage<UserProfile | null>(storageKeys.profile, null);
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: getStorage<string>(storageKeys.token, ""),
    profile: getInitialProfile(),
    loading: false,
  }),
  actions: {
    setSession(token: string, profile: UserProfile | null) {
      this.token = token;
      this.profile = profile;

      if (token) {
        setStorage(storageKeys.token, token);
      } else {
        removeStorage(storageKeys.token);
      }

      if (profile) {
        setStorage(storageKeys.profile, profile);
      } else {
        removeStorage(storageKeys.profile);
      }
    },
    async loadRemoteProfile() {
      this.loading = true;

      try {
        const remoteUser = await getRemoteUser(1);
        const profile: UserProfile = {
          id: remoteUser.id,
          name: remoteUser.name,
          email: remoteUser.email,
          username: remoteUser.username,
        };

        this.setSession(`demo-token-${remoteUser.id}`, profile);
        uni.showToast({
          title: "示例用户已加载",
          icon: "success",
        });
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.setSession("", null);
      uni.showToast({
        title: "已清除本地登录态",
        icon: "none",
      });
    },
  },
});
