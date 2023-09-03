import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Button from "../components/Button";
import Card from "../components/Card";
import { signup } from "../store/actions/UserActions";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().required("Please enter your required"),
}).required();

export default function Signup() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    signup(data, navigate);
  };

  return (
    <div className="bg-light dark:bg-dark h-[91.6vh] mt-[60px] flex items-center justify-center overflow-hidden">
      <div className="flex items-center justify-center w-max">
        <Card>
          <form className="p-5 md:py-20 md:px-14 w-full md:w-[500px] flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="text-black dark:text-white">Name</label>
              <input type="text" id="name" className={`bg-light dark:bg-dark outline-none p-2 text-black dark:text-white border ${errors.name?.message ? "border-red" : "border-black dark:border-white"} rounded-md w-[100%]`} placeholder="Name" {...register("name")} />
              <p className="text-red text-xs">{errors.name?.message}</p>
            </div>

            <div>
              <label htmlFor="email" className="text-black dark:text-white">Email</label>
              <input type="email" id="email" className={`bg-light dark:bg-dark outline-none p-2 text-black dark:text-white border ${errors.email?.message ? "border-red" : "border-black dark:border-white"} rounded-md w-[100%]`} placeholder="demo@gmail.com" {...register("email")} />
              <p className="text-red text-xs">{errors.email?.message}</p>
            </div>

            <div>
              <label htmlFor="password" className="text-black dark:text-white">Password</label>
              <input type="password" id="password" className={`bg-light dark:bg-dark outline-none p-2 text-black dark:text-white border ${errors.password?.message ? "border-red" : "border-black dark:border-white"} rounded-md w-[100%]`} placeholder="*****" {...register("password")} />
              <p className="text-red text-xs">{errors.password?.message}</p>
            </div>

            <div className="flex w-full justify-end">
              <Button fullWidth={true} text="Signup" name="signup" type="submit" />
            </div>
            <p className="text-sm text-center text-black dark:text-white">Alredy a user ?
              <Link to="/login" className="underline text-green">&nbsp; Login</Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
