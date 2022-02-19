import React from "react";
import Navbar from "../components/Navbar";
import {
  Card,
  CardContent,
  CardDetails,
  CardItems,
  CardTitle,
} from "../styles/cardStyles";
import { useGetAllTasks } from "../hooks";

type tasks = {
  tasks: {
    name: string;
    id: string;
  }[];
};

function HomePage(): React.ReactElement {
  const { data: allTasks, isFetching } = useGetAllTasks<tasks>();
  if (isFetching) {
    return <></>;
  }

  return (
    <div>
      <Navbar />
      <div style={{ margin: 40 }}>
        {allTasks?.tasks.map((item) => {
          return (
            <Card onClick={() => console.log("hello")}>
              <CardContent>
                <CardDetails>
                  <CardItems>
                    <CardTitle>{item.name}</CardTitle>
                  </CardItems>
                </CardDetails>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
