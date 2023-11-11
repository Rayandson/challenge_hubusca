export type RootStackParamList = {
    Home: undefined;
    UserPage: { userData: {
      id: number;
      avatar_url: string;
      name: string;
      login: string;
      location: string;
      followers: number;
      public_repos: number;
      repos_url: string;
    }};
  };

  export type UserData = {
    id: number;
    avatar_url: string;
    name: string;
    login: string;
    location: string;
    followers: number;
    public_repos: number;
    repos_url: string;
  }
  
  export type UserRepo = {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    html_url: string;
    created_at: string | null;
    pushed_at: string | null;
  }