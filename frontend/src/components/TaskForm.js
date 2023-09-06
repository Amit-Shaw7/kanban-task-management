import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../store/actions/TaskActions';
import { useSelector } from 'react-redux';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
}).required();

const TaskForm = ({ task, handleClose, type }) => {
  const {todo} = useSelector(state => state.task);
  const defaultValues = {
    title: task?.title,
    description: task?.description
  }
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    handleClose();
    if (type === 'add') {
      data.index = todo?.length;
      data.status = 'Todo';
      dispatch(addTask(data));
    } else {
      dispatch(editTask(data, task?._id , task?.status));
    }
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='title' className='text-black dark:text-white'>Title</label>
        <input id='title' className={`bg-light dark:bg-dark-card outline-none p-2 text-black dark:text-white border ${errors.title?.message ? 'border-red' : 'border-dark'} rounded-md w-[100%]`} placeholder='Title' {...register('title')} />
        <p className='text-red text-xs'>{errors.title?.message}</p>
      </div>

      <div>
        <label htmlFor='description' className='text-black dark:text-white'>Description</label>
        <textarea rows={5} id='description' className={`resize-none overflow-y-scroll bg-light dark:bg-dark-card outline-none p-2 text-black dark:text-white border ${errors.title?.message ? 'border-red' : 'border-dark'} rounded-md w-[100%]`} placeholder='Description' {...register('description')} />
        <p className='text-red text-xs'>{errors.description?.message}</p>
      </div>

      <div className='flex w-full justify-end'>
        <Button text={type === 'add' ? 'Add' : 'Submit'} type='submit' />
      </div>
    </form>
  );
}

export default TaskForm;
