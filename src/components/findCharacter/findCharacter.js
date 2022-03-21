import './findCharacter.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const check = (value) => {
    
    alert(value)

    return value === 'ivan'
}

const Error = () => (
    <ErrorMessage name='name'>
        {
            () => <h1 className='error'>Validation error</h1>
        }
    </ErrorMessage>
)

const FindCharacter = () => {
    return (

        <div>
            <Formik
                initialValues={{
                    name:""
                }}
                validationSchema = {yup.object({
                        name:yup.string()
                                .required("Validation error")       
                    })
                }

                validate = {value => {
                    check(value.name)
                    return {request:value!=='Ivan'}
                }}

                onSubmit = {(values, { setSubmitting })=>{
                    alert(1)
                    setSubmitting(false);
                }}
            >
               {
                   ({isSubmitting, errors, touched}) => (
                       <Form id='form'>
                         <label htmlFor="name" id='labelName'>Or find a character by name:</label>
                         <Field type="text" id='name' name="name" placeholder="Enter name"/>
                        
                         <button className='button button__main sumbit' type='submit' disabled={isSubmitting} ><div className="inner">Find</div></button>
                         {
                             touched.name ? <Error/> : null
                         }
                         {errors.request && touched.name ? <h1 className='error'>The character was not found. Check the name and try again</h1> : null}
                       </Form>
                   )
               } 
            </Formik>
        </div>
    )
}

export default FindCharacter;