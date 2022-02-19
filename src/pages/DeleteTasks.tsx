import React from "react";
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useDeleteTask, useGetAllTasks } from "../hooks";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

type tasks = {
  tasks: {
    name: string;
    id: string;
  }[];
};

type Target = {
  value: string;
  name: string;
  checked?: boolean;
};

function DeleteTask() {
  const classes = useStyles();
  const [tasks, setTasks] = React.useState<string[]>([]);

  const { data: allTasks, isFetching } = useGetAllTasks<tasks>();
  const { mutateAsync: bulkDeleteTasks } = useDeleteTask();

  if (isFetching) {
    return <></>;
  }

  const handleChange = ({ target, id }: { target: Target; id: string }) => {
    if (tasks.includes(id)) {
      setTasks(tasks.filter((value: string) => value !== id));
      return;
    }

    setTasks((prevValues: string[]) => [...prevValues, id]);
  };

  const handleTasksDeletion = async () => {
    await bulkDeleteTasks({ ids: tasks });
  };

  return (
    <>
      <Navbar />
      {allTasks?.tasks.length ? (
        <>
          <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Delete Tasks</FormLabel>
              <FormGroup>
                {allTasks?.tasks.map((item) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={tasks.includes(item.id)}
                          onChange={(e) =>
                            handleChange({ target: e.target, id: item.id })
                          }
                          name={item.name}
                        />
                      }
                      label={item.name}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </div>
          <Button
            variant="outlined"
            style={{ margin: 10 }}
            onClick={handleTasksDeletion}
          >
            Delete Tasks
          </Button>
        </>
      ) : (
        "No Tasks Available to delete"
      )}
    </>
  );
}

export default DeleteTask;
