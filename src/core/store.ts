import { makeAutoObservable } from "mobx";
import AuthService from "./api.auth";
import { meditationsMocks } from "../assets/data/data";
import Meditation from "../types/meditation";

class AuthStore {   
  isAuth = false;
  isAuthInProgress = false;
  
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async login(email: string, password: string) {
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.login(email, password);
      localStorage.setItem("token", resp.data.accessToken);
      this.isAuth = true;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    } finally {
      this.isAuthInProgress = false;
    } 
  }

  async checkAuth() {
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.refresh();
      localStorage.setItem("token", resp.data.accessToken);
      this.isAuth = true;
    } catch (err) {
      console.error("Auth check error:", err);
      throw err;
    } finally {
      this.isAuthInProgress = false;
    } 
  }

  async logout() {
    this.isAuthInProgress = true;
    try {
      await AuthService.logout();
      this.isAuth = false;
      localStorage.removeItem("token");
    } catch (err) {
      console.error("Logout error:", err);
      throw err;
    } finally {
      this.isAuthInProgress = false;
    } 
  }
}

class MeditationStore {
  items: Meditation[] = meditationsMocks;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addItem(item: Meditation) {
    this.items.push(item);
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  updateItem(id: number, data: Omit<Meditation, "id">) {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...data, id };
    }
  }
}

class RootStore {
  authStore: AuthStore;
  meditationStore: MeditationStore;

  constructor() {
    this.authStore = new AuthStore();
    this.meditationStore = new MeditationStore();
  }
}

export const store = new RootStore();
export const { authStore, meditationStore } = store;
export const addItem = meditationStore.addItem.bind(meditationStore);

export default store;