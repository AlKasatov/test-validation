export const form1 = {
    name: {
        placeholder: 'Имя',
        type: 'text',
        errorMsg: 'Имя должно состоять не менее, чем из 2 символов, это ведь не радиопозывной, согласитесь',
        validate: value => {
            return value.trim().length < 2
        }
    },
    surname: {
        placeholder: 'Фамилия',
        type: 'text',
        errorMsg: 'Фамилия должна состоять не менее, чем из 5 символов. Смените ее в паспортном столе и заполните форму',
        validate: value => {
            return value.trim().length < 5 
        }
    },
    age: {
        placeholder: 'Возраст',
        type: 'number',
        errorMsg: 'Возраст должен быть больше 60 лет. Постарейте и заполните форму',
        validate: value => {
            return +value.trim() <= 60
        }
    },
    phone: {
        placeholder: 'Номер телефона',
        type: 'number',
        errorMsg: 'Номер должен состоять из 11 цифр. Римские цифры не принимаются',
        validate: value => {
            return value.trim().match(/\D/) || value.trim().length !== 11
        }
    },
}