import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import styles from "../styles/style.module.css";

const Upcoming = () => {
  return (
    <Card className={`w-full lg:w-1/2 ${styles.customCard}`}>
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
  );
};

export default Upcoming;
