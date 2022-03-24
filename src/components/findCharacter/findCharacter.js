import './findCharacter.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import useGetData from '../../services/getData';




const Error = () => (
    <ErrorMessage name='name'>
        {
            () => <h1 className='error'>Validation error</h1>
        }
    </ErrorMessage>
)

const FindCharacter = () => {

    const {getCharacterByName} = useGetData()


    const getChar = async(value) => await getCharacterByName('TENEBROUS').then(res => res)
    
    const checkChar = async(val) =>{

        const Data = await getChar(val)

        return await Data.length == 0 ? false : Data

    } 

    const validationIsSuccessfuly = (data) => {

        

    }

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

       
                onSubmit = {async(values, { setSubmitting })=>{

                    setSubmitting(true);

                    const someNum = await checkChar(values.name)

                     if ( !(await someNum) )  return  false


                   
                    
                    
                     
                    
                }}
            >
               {
                   ({isSubmitting, errors, touched}) => (
                       <Form id='form'>
                         <label htmlFor="name" id='labelName'>Or find a character by name:</label>
                         <Field type="text" id='name' name="name" placeholder="Enter name"/>
                        
                         <button className='button button__main sumbit' type='submit' disabled={isSubmitting}  ><div className="inner">Find</div></button>
                      
                             <Error/>
                         {/* {errors.request && touched.name ? <h1 className='error'>The character was not found. Check the name and try again</h1> : null}   */}
                       </Form>
                   )
               } 
            </Formik>
        </div>
    )
}

export default FindCharacter;