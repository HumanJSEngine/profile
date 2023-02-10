import React from 'react';

const Communitycard = ({
    item,
    inputEdit,
    textareaEdit,
    disableUpdate,
    updatePost,
    enableUpdate,
    deletePost,
    index,
}) => {
    return (
        <>
            <article>
                {item.enableUpdate ? (
                    <>
                        <div className='txt'>
                            <input
                                type='text'
                                defaultValue={item.title}
                                placeholder='제목을 입력하세요'
                                ref={inputEdit}
                            />
                            <br />
                            <textarea
                                cols='30'
                                row='5'
                                defaultValue={item.content}
                                placeholder='내용을 입력'
                                ref={textareaEdit}
                            ></textarea>
                        </div>
                        <div className='btnSet'>
                            <button onClick={() => disableUpdate(index)}>
                                CANCEL
                            </button>
                            <button onClick={() => updatePost(index)}>
                                SAVE
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='txt'>
                            <h2>{item.title}</h2>
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
                    </>
                )}
            </article>
        </>
    );
};

export default Communitycard;
