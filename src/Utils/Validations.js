import Validator from 'is_js';

const checkEmpty = (val, key) => {
  if (Validator.empty(val.trim())) {
    return `${key}`;
  } else {
    return '';
  }
};

const checkMinLength = (val, minLength, key) => {
  if (val.trim().length < minLength) {
    return `Please enter valid ${key}`;
  } else {
    return '';
  }
};

const checkConfirmPassword = (val, password, key) => {
  if (val.trim() !== password.trim()) {
    return key;
  } else {
    return '';
  }
};

export default function (data) {
  const {username, email, password, cpassword, dob, name, access_type, community_type, age_level, phone_number} = data;

  if (access_type !== undefined) {
    let emptyValidationText = checkEmpty(access_type, 'Please select access type');
    if (emptyValidationText != '') {
      return emptyValidationText;
    }
  }

  // if(phone_number !== undefined){
  //   let emptyValidationText = checkEmpty(phone_number, 'Please enter the phone number');
  //   if (emptyValidationText != '') {
  //     return emptyValidationText;
  //   }
  // }

  if (community_type !== undefined) {
    let emptyValidationText = checkEmpty(community_type, 'Please select community type');
    if (emptyValidationText != '') {
      return emptyValidationText;
    }
  }

  if (age_level !== undefined) {
    let emptyValidationText = checkEmpty(age_level, 'Please select age level');
    if (emptyValidationText != '') {
      return emptyValidationText;
    }
  }

  if (name !== undefined) {
    let emptyValidationText = checkEmpty(name, 'Please enter community name');
    if (emptyValidationText != '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(
        name,
        3,
        'community name, Minimum character length is 3',
      );
      if (minLengthValidation !== '') {
        return minLengthValidation;
      }
    }
  }

  if (username !== undefined) {
    let emptyValidationText = checkEmpty(
      username,
      'Please enter your username',
    );
    if (emptyValidationText != '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(
        username,
        3,
        'Minimum length is 3 for the username',
      );
      if (minLengthValidation !== '') {
        return minLengthValidation;
      }
    }
  }

  // if (phone_number !== undefined) {
  //   let emptyValidationText = checkEmpty(
  //     phone_number,
  //     'Please enter your phone number',
  //   );
  //   if (emptyValidationText != '') {
  //     return emptyValidationText;
  //   }
  // }

  if (password !== undefined) {
    let emptyValidationText = checkEmpty(
      password,
      'Please enter your password',
    );
    if (emptyValidationText != '') {
      return emptyValidationText;
    } else {
      // let minLengthValidation = checkMinLength(
      //   password,
      //   4,
      //   'Minimum length is 4 for the password',
      // );
      // if (minLengthValidation !== '') {
      //   return minLengthValidation;
      // }
    }
  }

  if (cpassword !== undefined) {
    let emptyValidationText = checkEmpty(
      cpassword,
      'Please enter confirm password',
    );
    if (emptyValidationText != '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(
        cpassword,
        6,
        'Minimum length is 6 for confirm password',
      );
      if (minLengthValidation !== '') {
        return minLengthValidation;
      }
    }
  }

  if (password !== undefined && cpassword !== undefined) {
    let checkCP = checkConfirmPassword(
      cpassword,
      password,
      'Please check both the passwords are same',
    );
    if (checkCP !== '') {
      return checkCP;
    }
  }

  if (dob !== undefined) {
    let newDate = new Date(dob.trim());
    if (!Validator.date(newDate)) {
      return 'Please enter valid date';
    } else {
      return '';
    }
  }
}
