export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/
);

export const PASSWORD_ERR_MESSAGE = "비밀번호는 대소문자와 특수문자를 포함해야 합니다";