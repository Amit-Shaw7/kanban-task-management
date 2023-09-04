import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Button from "../components/Button";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/UserActions";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const schema = yup.object({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().required("Please enter your required"),
}).required();

export default function Login() {
  const {loading} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    dispatch(login(data, navigate));
  };

  return (
    <>
      {
        loading
          ?
          <Loader />
          :
          <div className="bg-light dark:bg-dark h-[91.6vh] mt-[60px] flex items-center justify-center overflow-hidden">
            <div className="flex items-center justify-center w-max">
              <Card>
                <form className="p-5 md:px-14 md:py-20 flex flex-col gap-3 w-full md:w-[500px]" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="email" className="text-black dark:text-white">Email</label>
                    <input type="email" id="email" className={`bg-light dark:bg-dark outline-none p-2 text-black dark:text-white border ${errors.email?.message ? "border-red" : "border-dark dark:text-white"} rounded-md w-[100%]`} placeholder="demo@gmail.com" {...register("email")} />
                    <p className="text-red text-xs">{errors.email?.message}</p>
                  </div>

                  <div>
                    <label htmlFor="password" className="text-black dark:text-white">Password</label>
                    <input type="password" id="password" className={`font-sans bg-light dark:bg-dark outline-none p-2 text-black dark:text-white border ${errors.password?.message ? "border-red" : "border-dark dark:text-white"} rounded-md w-[100%]`} placeholder="*****" {...register("password")} />
                    <p className="text-red text-xs">{errors.password?.message}</p>
                  </div>

                  <Button fullWidth={true} text="Login" name="login" />
                  <p className="text-black dark:text-white text-sm text-center">New user ?
                    <Link to="/signup" className="underline text-green">&nbsp; Signup</Link>
                  </p>
                </form>
              </Card>
            </div>
          </div>
      }
    </>
  );
}
