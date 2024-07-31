import React from "react";
import "../../styles/home.css";
import Contacts from "../component/Contacts";

export const Home = () => {
  const imgUrls = ["https://th.bing.com/th/id/R.f04550c45ff5b667a280f2f5b423a081?rik=7QvJazs9VIMfag&riu=http%3a%2f%2fd1poh340f4imgl.cloudfront.net%2fupload%2fimages%2foriginales%2f2015%2f04%2f06%2f5c735a92362ff628d35a25b3f0bd11b6.jpg&ehk=qc9P4iZDED8WR5gxlA0h0epl5HrdUIOA431ZReOcUE4%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
    "https://i.pinimg.com/originals/08/12/05/08120506622e27f5b48159d7aacd94b1.jpg",
    "https://th.bing.com/th/id/OIP.Or_v9E6uKG4FLxwkawWlMwAAAA?rs=1&pid=ImgDetMain",
    "https://i.pinimg.com/originals/a8/eb/45/a8eb455f59542fbc440ca9e6fed17769.jpg",
    "https://cdn.mugshots.zone/sites/charlestonsc/images/2021/08/30/fayzWa4NHPf6wqvH34la.jpg",
    "https://th.bing.com/th/id/OIP.hNMwUMwgIeWuXvBOJf3zRwAAAA?rs=1&pid=ImgDetMain"]

  return (
    <>
      <Contacts imgs={imgUrls} />
    </>
  );
};