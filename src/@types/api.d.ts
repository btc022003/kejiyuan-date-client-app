interface IBanners {
  id: string;
  image: string;
  name: string;
  url: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

interface IZhanpins {
  id: string;
  name: string;
  summary: string;
  content: string;
  image: string;
  isHot: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IHuodongs {
  id: string;
  name: string;
  summary: string;
  image: string;
  content: string;
  isEnd: boolean;
  huoDongShiJian: string;
  huoDongAddress: string;
  createdAt: string;
  updatedAt: string;
}

interface IUser {
  userName: string;
  avatar: string;
}

interface IZhanPinComment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  zhanPinId: string;
  userId: string;
  user: IUser;
}

interface ICollection {
  id: string;
  createdAt: string;
  updatedAt: string;
  zhanPinId: string;
  userId: string;
  zhanPin: IZhanpins;
}
