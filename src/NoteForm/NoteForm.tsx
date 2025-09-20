import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createNote } from '../services/noteService'; 
import * as Yup from "yup";
 



export default function NoteForm({ onClose }: { onClose: () => void }) {
     
const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();  
    },
});
  
  
const validationSchema = Yup.object({
    title: Yup.string().min(3, 'Min 3 characters').max(50, 'Max 50 characters').required('Required'),
    content: Yup.string().max(500, 'Max 500 characters'),
    tag: Yup.string()
      .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
      .required('Required'),
  });


     return (
        <Formik initialValues={{ title: '', content: '', tag: 'Todo' }} validationSchema={validationSchema}
  onSubmit={(values, { resetForm }) => {
        mutation.mutate(values);
        resetForm();
      }}
                 > 
        <Form className={css.form}  >
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
             <Field id="title" type="text" name="title" className={css.input}  />
    <ErrorMessage name="title" component="span" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <Field 
       as="textarea"
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
    <ErrorMessage name="content" component="span" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field as="select" id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage name="tag" component="span" className={css.error} />
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={onClose}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={false}
    >
      Create note
    </button>
  </div>
             </Form>
             </Formik>
    )
}