import React, { useState, useRef, useEffect } from "react";
import Layout from "../common/Layout";

const Community = () => {
    const initPost = [
        { title: "Hello 1", content: "Welcome Fp, React" },
        { title: "Hello 2", content: "Welcome Fp, React" },
        { title: "Hello 3", content: "Welcome Fp, React" },
        { title: "Hello 4", content: "Welcome Fp, React" },
        { title: "Hello 5", content: "Welcome Fp, React" },
    ];

    // 출력 목록 관리 state
    const [posts, setPosts] = useState(initPost);
    const input = useRef(null);
    const contents = useRef(null);

    const createPost = () => {
        if (
            input.current.value.trim() === "" ||
            contents.current.value.trim() === ""
        ) {
            resetPost();
            alert("제목과 본문을 입력하세요");
        }
        // 새로운 포스트 등록
        // state 업데이트라서 화면 갱신
        setPosts([
            ...posts,
            { title: input.current.value, content: contents.current.value },
        ]);

        resetPost();
    };

    const resetPost = () => {
        input.current.value = "";
        contents.current.value = "";
    };

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    return (
        <Layout title={"Community"}>
            <div className="inputBox">
                <form>
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        ref={input}
                    />
                    <br />
                    <textarea
                        cols="30"
                        rows="5"
                        placeholder="분류를 입력하세요"
                        ref={contents}
                    ></textarea>
                    <div className="btnSet">
                        {/*form 안쪽에 버튼을 type을 정의한다 */}
                        <button type="button" onClick={resetPost}>
                            CANCEL
                        </button>
                        <button type="button" onClick={createPost}>
                            WRITE
                        </button>
                    </div>
                </form>
            </div>
            <div className="showBox">
                {posts.map((item, idx) => (
                    <article key={item.index}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                        <div className="btnSet">
                            <button>EDIT</button>
                            <button>DELETE</button>
                        </div>
                    </article>
                ))}
            </div>
        </Layout>
    );
};

export default Community;
