export interface Post {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export const posts: Post[] = [
  {
    id: "1",
    content: "В любом процессе важна не скорость, а удовольствие",
    author: "J.Statham",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    content:
      "У каждого из нас есть достоинства, за которые стоит простить недостатки",
    author: "J.Statham",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    content:
      "Неважно, насколько красивы ваши слова, судить я буду по поступкам",
    author: "J.Statham",
    createdAt: new Date().toISOString(),
  },
];

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
}

export const comments: Comment[] = [
  {
    id: "3",
    postId: "1",
    content: "Привет вот и я",
    author: "J.Statham",
    createdAt: new Date().toISOString(),
  },
];

export interface User {
  id: string;
  username: string;
  fullName: string;
  biography?: string;
  avatarUrl?: string | null;
  bannerURL?: string | null;
  passwordHash: string;
  createdAt: string;
}

export const users: User[] = [
  {
    id: "1",
    username: "chuvak",
    fullName: "Sinister",
    biography: "Fullstack JS developer. Люблю кофе и чистый код.",
    avatarUrl: "https://example.com/avatars/sinister.png",
    bannerURL: null,
    passwordHash: "argon2id$v=19$m=65536,t=3,p=4$hash1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    username: "neo_matrix",
    fullName: "Thomas Anderson",
    biography: "Избранный. Иногда вижу код без отладчика.",
    avatarUrl: "https://example.com/avatars/neo.png",
    bannerURL: "https://example.com/banners/matrix.jpg",
    passwordHash: "argon2id$v=19$m=65536,t=3,p=4$hash2",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    username: "trinity_dev",
    fullName: "Trinity",
    biography: "Взламываю систему. Пишу на TypeScript.",
    avatarUrl: null,
    bannerURL: null,
    passwordHash: "argon2id$v=19$m=65536,t=3,p=4$hash3",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    username: "morpheus_js",
    fullName: "Morpheus",
    biography: "Предлагаю только красную таблетку — Node.js.",
    avatarUrl: "https://example.com/avatars/morpheus.png",
    bannerURL: null,
    passwordHash: "argon2id$v=19$m=65536,t=3,p=4$hash4",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    username: "cat_lover_99",
    fullName: "Кот Батон",
    biography: "Пишу код лапами. Люблю спать на клавиатуре.",
    avatarUrl: "https://example.com/avatars/cat.png",
    bannerURL: null,
    passwordHash: "argon2id$v=19$m=65536,t=3,p=4$hash5",
    createdAt: new Date().toISOString(),
  },
];
