import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { TaskComponent } from "./tasks/task/task.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { TasksComponent } from "./tasks/tasks.component";

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent
    },

    {
        path: 'users/:userId', // <your-domain>/tasks
        component: UserTasksComponent,
        children: [
            {
                path: 'tasks',
                component: TasksComponent
            },
            {
                path: 'tasks/new',
                component: NewTaskComponent
            }
        ]
    }
]