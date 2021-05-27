module.exports = {

    // feeling
    FEELING_EMPTY : { "isSuccess": false, "code": 2023, "message": "기분 인덱스를 입력해주세요" },
    FEELING_ID_EXCEED : { "isSuccess": false, "code": 2024, "message": "기분 인덱스 범위를 벗어났습니다" },

    // type
    TYPE_EMPTY : { "isSuccess": false, "code": 2025, "message": "타입을 입력해주세요" },
    TYPE_RANGE : { "isSuccess": false, "code": 2026, "message": "타입 범위를 벗어났습니다" },
    
    // month
    NUM_MONTH: { "isSuccess": false, "code": 2027, "message": "월을 입력해주세요" },
    NUM_FOLDER: { "isSuccess": false, "code": 2028, "message": "폴더아이디를 입력해주세요" },
    NUM_RECOMM: { "isSuccess": false, "code": 2029, "message": "추천노래 아이디를 입력해주세요" },

    // weather
    WEATHER_INDEX_EMPTY : { "isSuccess": false, "code": 2030, "message": "날씨 인덱스를 입력해주세요" },
    WEATHER_EXCEED : { "isSuccess": false, "code": 2031, "message": "날씨 인덱스 범위를 벗어났습니다" },



    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    EMPTY_WEATHER_RESULT : { "isSuccess": false, "code": 3007, "message": "날씨 조회 실패" },

    // feeling
    EMPTY_FEELING_RESULT : { "isSuccess": false, "code": 3008, "message": "기분을 입력해주세요" },

    // weather
    EMPTY_WEATHER_RESULT : { "isSuccess": false, "code": 3009, "message": "날씨를 입력해주세요" },
    
    // 날씨 + 기분별
    EMPTY_WEATHERFEELING_RESULT : { "isSuccess": false, "code": 3010, "message": "추천 받은 노래가 없습니다" },
    
    PLAYLIST_RESULT : { "isSuccess": false, "code": 3011, "message": "플레이리스트에 저장할 수 없는 노래입니다." },

    // 기분 플레이리스트
    EMPTY_PLAYLIST1_RESULT : { "isSuccess": false, "code": 3012, "message": "해당 기분의 추천된 노래가 없습니다." },
    EMPTY_PLAYLIST2_RESULT : { "isSuccess": false, "code": 3013, "message": "해당 날씨의 추천된 노래가 없습니다." },
    EMPTY_PLAYLIST_RESULT : { "isSuccess": false, "code": 3014, "message": "좋아요 누른 노래가 없습니다." },

    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
}
