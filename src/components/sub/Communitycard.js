import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// {...register(항목)} 에 대한 체크 출력

const schema = yup.object({
    title: yup.string().trim().required('제목을 입력해주세요.'),
    content: yup.string().trim().required('내용을 입력하세요.'),
    timestamp: yup.string().trim().required('날짜를 선택해 주세요'),
});

const Communitycard = ({
    item,
    disableUpdate,
    updatePost,
    enableUpdate,
    deletePost,
    index,
}) => {
    //02. useForm 적용 , formState는 error, resolver에는 yupResolver (schema 연결)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

    return (
        <>
            <article>
                {item.enableUpdate ? (
                    <form onSubmit={handleSubmit(updatePost)}>
                        <div className='txt'>
                            <input
                                type='text'
                                defaultValue={item.title}
                                placeholder='제목을 입력하세요'
                                // ref={inputEdit}
                                {...register('title')}
                            />
                            <span className='messsage'>
                                {errors.title?.message}
                            </span>
                            <br />
                            <textarea
                                cols='30'
                                row='5'
                                defaultValue={item.content}
                                placeholder='내용을 입력'
                                // ref={textareaEdit}
                                {...register('content')}
                            ></textarea>
                            <span className='err'>
                                {errors.content?.message}
                            </span>
                            <br />
                            <input
                                type='date'
                                defaultValue={item.timestamp}
                                {...register('timestamp')}
                            />
                            <span className='err'>
                                {errors.timestamp?.message}
                            </span>
                            <br />
                            <input
                                type='hidden'
                                value={index}
                                {...register('index')}
                                readOnly
                                style={{ opacity: 0 }}
                            />
                        </div>
                        <div className='btnSet'>
                            <button
                                type='reset'
                                onClick={() => disableUpdate(index)}
                            >
                                CANCEL
                            </button>
                            <button type='submit'>SAVE</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit()}>
                        <div className='txt'>
                            <h2>
                                {item.title}{' '}
                                <span className='day'>{item.timestamp}</span>
                            </h2>
                            <p>{item.content}</p>
                        </div>
                        <div className='btnSet'>
                            <button onClick={() => enableUpdate(index)}>
                                EDIT
                            </button>
                            <button onClick={() => deletePost(index)}>
                                DELETE
                            </button>
                        </div>
                    </form>
                )}
            </article>
        </>
    );
};

export default Communitycard;
