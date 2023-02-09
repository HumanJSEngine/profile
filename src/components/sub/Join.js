import React, { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

import Layout from "../common/Layout";
const Join = () => {
    let initVal = {
        userid: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
        address: "",
        address2: "",
        gender: "",
        birthday: "",
        interests: "",
        edu: "",
        hobby: null,
        comment: "",
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

    const [postVisible, setPostVisible] = useState(false);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== ""
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setVal({ ...val, address: fullAddress });
        setPostVisible(false);
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
        if (_val.phone === "") {
            errs.phone = "전화번호를 입력하세요";
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
        if (_val.comment.length < 20) {
            errs.comment = "남기는 말을 20글자 이상 입력";
        }
        //주소 체크
        if (_val.address === "") {
            errs.address = "주소를 입력해주세요";
        }
        if (_val.address === "") {
            errs.address2 = "상세주소를 입력";
        }
        //생년월일 체크
        if (_val.birthday === "") {
            errs.birthday = "생년월일을 입력";
        }

        return errs;
    };

    const handleReset = () => {
        setVal(initVal);
        setErr({});
    };

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

    const handlePhone = (e) => {
        const { name } = e.target;
        let value = e.target.value;
        value = value
            .replace(/[^0-9]/g, "") // 숫자를 제외한 모든 문자 제거
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

        setVal({ ...val, [name]: value });
    };

    const handleBirthday = (e) => {
        const { name } = e.target;
        let value = e.target.value;
        value = value.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
        setVal({ ...val, [name]: value });
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
                            {/* 전화번호 */}
                            <tr>
                                <th>
                                    <label htmlFor="phone">PHONE</label>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="전화번호를 입력"
                                        maxLength={13}
                                        onChange={handlePhone}
                                        value={val.phone}
                                    />
                                    <span className="err">{Err.phone}</span>
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
                                    <label htmlFor="address">Address</label>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="주소를 입력"
                                        onChange={handleChange}
                                        readOnly
                                        onClick={() =>
                                            setPostVisible(!postVisible)
                                        }
                                        style={{ cursor: "pointer" }}
                                        value={val.address}
                                    />
                                    <span className="err">{Err.address}</span>
                                    {postVisible && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                background: "#FFF",
                                            }}
                                        >
                                            <button
                                                onClick={() =>
                                                    setPostVisible(false)
                                                }
                                            >
                                                닫기
                                            </button>
                                            <DaumPostcodeEmbed
                                                onComplete={handleComplete}
                                                style={{
                                                    width: 400,
                                                    height: 600,
                                                }}
                                            />
                                        </div>
                                    )}
                                    <br />
                                    <input
                                        type="text"
                                        id="address2"
                                        name="address2"
                                        placeholder="상세주소를 입력하세요"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            {/* 생년월일 */}
                            <tr>
                                <th>
                                    <label htmlFor="birthday">BIRTHDAY</label>
                                </th>
                                <td>
                                    <input
                                        type="date"
                                        id="birthday"
                                        name="birthday"
                                        placeholder="생년월일을 입력해 주세요"
                                        onChange={handleBirthday}
                                        maxLength={13}
                                    />
                                    <span className="err">{Err.birthday}</span>
                                </td>
                            </tr>
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
                            <tr>
                                <th>
                                    <label htmlFor="comment">COMMENT</label>
                                </th>
                                <td>
                                    <textarea
                                        name="comment"
                                        id="comment"
                                        cols="30"
                                        row="5"
                                        placeholder="남기는 말을 입력"
                                        onChange={handleChange}
                                    ></textarea>
                                    <span className="err">{Err.comment}</span>
                                </td>
                            </tr>
                            {/* 폼 전송 */}
                            <tr>
                                <th colSpan="2">
                                    <input
                                        type="reset"
                                        onClick={handleReset}
                                        value="RESET"
                                    />
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
