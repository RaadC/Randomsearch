import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";

const url = "https://randomuser.me/api/?results=100";

export default function Home() {
  const [data, setData] = useState(null); //data from randomuser.me
  const [isLoading, setLoading] = useState(false); //loading state
  const [searchUser, setSearchUser] = useState(""); //input of user
  const [filteredResults, setFilteredResults] = useState([]); //filtered data

  //fetching of results from randomuser.me
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setLoading(false);
      });
  }, []);

  //logic of searching
  const searchItems = (searchValue) => {
    setSearchUser(searchValue); //setting the search value
    //setting the data if filtered or not
    if (searchUser !== "") {
      //if there is input in search bar = filtered data
      const filteredData = data.filter((item) => {
        return Object.values(item.name)
          .join("")
          .toLowerCase()
          .includes(searchUser.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      // else if none = data
      setFilteredResults(data);
    }
  };

  //
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No user data</p>;

  // render, search bar, and map of data
  return (
    <div className={styles.container}>
      <Head>
        <title>User Finder</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>User Finder!</h1>
        <p className={styles.caption}>
          An application for searching on random user
        </p>
        <div>
          <input
            type="text"
            placeholder="Search User"
            onChange={(e) => searchItems(e.target.value)}
          ></input>
        </div>
        <div className={styles.cards}>
          {searchUser.length > 1
            ? filteredResults.map((value) => {
                return (
                  <div className={styles.card}>
                    <img
                      className={styles.avatar}
                      src={value.picture.medium}
                      border="5"
                      allign="center"
                    ></img>
                    <p>
                      {value.name.first} {value.name.last}
                    </p>
                    <i>@{value.login.username}</i>
                  </div>
                );
              })
            : data.map((value) => {
                return (
                  <div className={styles.card}>
                    <img
                      className={styles.avatar}
                      src={value.picture.medium}
                      border="5"
                      allign="center"
                    ></img>

                    <p>
                      {value.name.first} {value.name.last}
                    </p>
                    <i>@{value.login.username}</i>
                  </div>
                );
              })}
        </div>
      </main>
    </div>
  );
}
