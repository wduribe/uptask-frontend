import { z } from 'zod';

//*Auth
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    current_password: z.string(),
});

type Auth = z.infer<typeof authSchema>;

export type UserLogin = Pick<Auth, 'email' | 'password'>;
export type UserRegister = Pick<Auth, 'email' | 'name' | 'password'>;
export type UserRequest = Pick<Auth, 'email'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordFormType = Pick<Auth, 'password' | 'password_confirmation'>;
export type UpdateCurrentPasswordForm = Pick<Auth, 'current_password' | 'password'>;
export type CheckPasswordForm = Pick<Auth, 'password'>;

//*User

export const userSchema = authSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, 'email' | 'name'>

//* Types Notes
const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string(),
});

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

//*Types Task
export const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed']);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema,
    })),
    notes: z.array(noteSchema.extend({
        createdBy: userSchema
    })),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const taskProjectSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true,
})

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;
export type TaskProject = z.infer<typeof taskProjectSchema>;

//*Types Project
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userSchema.pick({ _id: true })),
    tasks: z.array(taskProjectSchema),
    team: z.array(z.string(userSchema.pick({_id: true}))),
});

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true,
    }),
);

export const editProjectSchema = projectSchema.pick({
    projectName: true, 
    clientName: true,
    description: true,
});

export const projectDetailsSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
    manager: true,    
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>;


//*Types member
export const teamMemberSchema = userSchema.pick({
    _id: true,
    email: true,
    name: true,
});

export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;