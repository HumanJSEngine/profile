import React, { useEffect, useRef } from "react";
import Layout from "../common/Layout";

const Community = () => {
    useEffect(() => {
        return () => {
            console.log("unmount : 컴포넌트 제거");
        };
    }, []);
    const input = useRef(null);
    const contents = useRef(null);

    const createPost = (e) => {};

    const resetPost = (e) => {};

    return (
        <Layout title={"Community"}>
            Community
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
        </Layout>
    );
};

export default Community;
