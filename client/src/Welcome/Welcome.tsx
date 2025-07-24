import { Title, Text } from "@mantine/core";
import * as classes from "./Welcome.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export function Welcome() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  console.log(token)
  console.log(import.meta.env.VITE_WEB_URL)

  useEffect(() => {
    auth()
  }, [])

  const auth = async () => {
    console.log('start auth')
    await axios.get(`${import.meta.env.VITE_WEB_URL}/access/${token}`)
    .then((res) => {
      console.log(res.data)
      sessionStorage.setItem('token', res.data.token)
      console.log(sessionStorage.getItem('token'))
      navigate('/')
    })
    .catch((e) => {
      console.log(e.response.data.message)
    })
  }

  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          GAMEBOT
        </Text>
      </Title>
    </>
  );
}
