import { cn } from "src/lib/utils"
import { Button } from "src/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "src/components/ui/card"

import { Input } from "src/components/ui/input"
import { Label } from "src/components/ui/label"
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { userStore } from "src/stores/userStore"
const formFields = z.object({
    name: z.string().min(1,),
    password: z.string().min(1),
    email: z.string().email({ message: "enter a valid email" }).min(1),
    phoneNumber: z.string().min(1),
})
type FormFields = z.infer<typeof formFields>;
export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const { emailSignup } = userStore()
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(formFields)
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        await emailSignup(data)
        navigate('/')
    };
    return (
        <div className={cn("flex flex-col gap-6 ", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Sign up Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" className="w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Sign up with Google
                                </Button>
                            </div>
                            <div className="relative text-center text-sm">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        {...register("email")}
                                    />
                                </div>
                                {errors.email?.message && (
                                    <div className="text-red-500"> error {errors.email?.message} </div>
                                )}
                                <div className="grid gap-3">
                                    {/* TODO: add forget password page */}
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        {...register('password')}
                                    />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="yourname"
                                        {...register('name')}

                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="phonenumber">Phone number</Label>
                                    <Input
                                        id="phonenumber"
                                        type="text"
                                        placeholder="123 123 123 123 123"
                                        {...register('phoneNumber')}

                                    />
                                </div>
                                <Button type="submit" className="w-full hover:cursor-pointer">
                                    Sign Up
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                already have an account?{" "}
                                <a onClick={() => navigate("/login")} className="underline underline-offset-4 hover:cursor-pointer">
                                    login
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
