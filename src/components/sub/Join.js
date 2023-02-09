import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
const Join = () => {
    let initVal = {
        userid: "",
        email: "",
        password: "",
        password2: "",
        gender: "",
        interests: "",
        edu: "",
    };
    const [val, setVal] = useState(initVal);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVal({ ...val, [name]: value });
    };

    const handleRadio = (e) => {
        const { name, id } = e.target;
        setVal({ ...val, [name]: id });
    };

    const handleCheck = (e) => {
        let isCheck = false;
        const { name } = e.target;
        const inputs = e.target.parentElement.querySelectorAll("input");
        let data = {};
        for (let item of inputs) {
            let { id, checked } = item;
            data[id] = checked;
            if (item.checked) isCheck = true;
        }
        setVal((prev) => {
            const obj = { ...prev };
            obj.hobby = data;
            return obj;
        });

        setVal((prev) => {
            const obj = { ...prev };
            obj[name] = isCheck;
            return obj;
        });
    };

    // 에러 정보 관리 객체
    const [Err, setErr] = useState({});
    const check = (_val) => {
        const errs = {};
        // 아이디 체크
        if (_val.userid.length < 5) {
            errs.userid = "아이디를 5글자 이상 입력해주세요.";
        }
        // 이메일 체크/이메일 정규표현식 이용한 처리
        if (_val.email.length < 8 || !/@/.test(_val.email)) {
            errs.email = "이메일은 최소 8글자 이상 @을 포함해 주세요.";
        }
        // 비밀번호
        const eng = /[a-zA-Z]/;
        const num = /[0-9]/;
        const spc = /[!@#$%^&*()_+]/;
        if (
            _val.password.length < 5 ||
            !eng.test(_val.password) ||
            !num.test(_val.password) ||
            !spc.test(_val.password)
        ) {
            errs.password =
                "비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함해 주세요.";
        }
        // 비밀번호2 체크
        if (_val.password !== _val.password2 || !_val.password2) {
            errs.password2 = "비밀번호를 동일하게 입력해주세요.";
        }
        // 성별 체크
        if (_val.gender === "") {
            errs.gender = "성별을 선택하세요.";
        }
        // 관심사 체크
        if (!_val.interests) {
            errs.interests = "관심사를 하나이상 선택해주세요.";
        }
        // 학력체크
        if (_val.edu === "") {
            errs.edu = "학력을 선택해주세요.";
        }
        return errs;
    };

    // 디버깅용
    useEffect(() => {
        console.log(val);
    }, [val]);
    useEffect(() => {
        console.log(Err);
    }, [Err]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErr(check(val));
    };

    return (
        <Layout title={"Join"}>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>회원 가입</legend>
                    <table>
                        <caption>회원 가입 정보 입력</caption>
                        <tbody>
                            {/* 아이디 입력 */}
                            <tr>
                                <th>
                                    <label htmlFor="userid">USER ID</label>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        id="userid"
                                        name="userid"
                                        placeholder="아이디를 입력하세요."
                                        onChange={handleChange}
                                    />
                                    <span className="err">{Err.userid}</span>
                                </td>
                            </tr>
                            {/* 이메일 */}
                            <tr>
                                <th>
                                    <label htmlFor="email">E-MAIL</label>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="이메일 주소를 입력해주세요."
                                        onChange={handleChange}
                                    />
                                    <span className="err">{Err.email}</span>
                                </td>
                            </tr>
                            {/* 비밀번호 */}
                            <tr>
                                <th>
                                    <label>PASSWORD</label>
                                </th>
                                <td>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="비밀번호를 입력하세요"
                                        onChange={handleChange}
                                    />
                                    <span className="err">{Err.password}</span>
                                </td>
                            </tr>
                            {/* 비밀번호2 */}
                            <tr>
                                <th>
                                    <label htmlFor="password2">
                                        PASSWORD 확인
                                    </label>
                                </th>
                                <td>
                                    <input
                                        type="password"
                                        id="password2"
                                        name="password2"
                                        placeholder="비밀번호를 입력하세요"
                                        onChange={handleChange}
                                    />
                                    <span className="err">{Err.password2}</span>
                                </td>
                            </tr>
                            {/* 성별체크 */}
                            <tr>
                                <th>GENDER</th>
                                <td>
                                    <label htmlFor="male">Male</label>
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        onChange={handleRadio}
                                    />
                                    <label htmlFor="female">Female</label>
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        onChange={handleRadio}
                                    />
                                    <span className="err">{Err.gender}</span>
                                </td>
                            </tr>
                            {/* 관심사 */}
                            <tr>
                                <th>INTERESTS</th>
                                <td>
                                    <label htmlFor="sports">Sports</label>
                                    <input
                                        type="checkbox"
                                        id="sports"
                                        name="interests"
                                        onChange={handleCheck}
                                    />
                                    <label htmlFor="music">Music</label>
                                    <input
                                        type="checkbox"
                                        id="music"
                                        name="interests"
                                        onChange={handleCheck}
                                    />
                                    <label htmlFor="game">Game</label>
                                    <input
                                        type="checkbox"
                                        id="game"
                                        name="interests"
                                        onChange={handleCheck}
                                    />
                                    <label htmlFor="etc">Etc</label>
                                    <input
                                        type="checkbox"
                                        id="etc"
                                        name="interests"
                                        onChange={handleCheck}
                                    />
                                    <span className="err">{Err.interests}</span>
                                </td>
                            </tr>
                            {/* 교육경력 */}
                            <tr>
                                <th>EDUCATION</th>
                                <td>
                                    <select
                                        name="edu"
                                        id="edu"
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            학력을 선택하세요.
                                        </option>
                                        <option value="step-1">
                                            초등학교 졸업
                                        </option>
                                        <option value="step-2">
                                            중학교 졸업
                                        </option>
                                        <option value="step-3">
                                            고등학교 졸업
                                        </option>
                                        <option value="step-4">
                                            대학교 졸업
                                        </option>
                                    </select>
                                    <span className="err">{Err.edu}</span>
                                </td>
                            </tr>
                            {/* 폼 전송 */}
                            <tr>
                                <th colSpan="2">
                                    <input type="reset" value="RESET" />
                                    <input type="submit" value="SUBMIT" />
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </form>
        </Layout>
    );
};

export default Join;
