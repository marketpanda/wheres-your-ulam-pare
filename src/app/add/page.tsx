"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

type FormFields = z.infer<typeof schema>

 
const Add = () => {

    const { register, handleSubmit, setError,
        formState: { errors, isSubmitting } } = useForm<FormFields>({
            defaultValues: {
                email: 'test@gmail.com'
            },
            resolver: zodResolver(schema)
        }) 
    const onSubmit: SubmitHandler<FormFields> = async(data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            throw new Error()
            console.log(data)
        } catch (error) {
            setError("root", {
                message: "This email is already taken"
            })

        }
    }
    return (
        <>
            <div>Add Place</div>
            <div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-[450px] mx-auto'>
                    <input
                        {...register("email")} 
                        className='border bg-red-500'
                        type="text" />
                    { errors.email && <div className="text-red-500">{errors.email.message}</div>}
                    <input
                        {...register("password")}
                        className='border bg-red-700'
                        type="text" />

                    { errors.password && <div className="text-red-500">{errors.password.message}</div>}           
                    <button disabled={isSubmitting} type="submit">{
                        isSubmitting ? 'Loading' : 'Submit'
                    }</button>

                    { errors.root && <div className="text-red-500">{errors.root.message}</div>} 
                </form>
            </div>
        </>
    )
}

export default Add