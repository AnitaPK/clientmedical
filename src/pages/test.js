const onFinish = (values) => {
    // Convert dateOfbirth to the required format (if needed)
    if (values.dateOfbirth) {
      values.dateOfbirth = values.dateOfbirth.format('YYYY-MM-DD');
    }

    // Prepare data to send as key-value pairs
    const payload = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      age: values.age,
      dateOfbirth: values.dateOfbirth,
      bloodGroup: values.bloodGroup,
      email: values.email,
      password: values.password,
      address: values.address,
    };

    axios.post('http://localhost:4000/api/patient/addpatient', payload)
      .then((response) => {
        console.log('Success:', response.data);
        message.success('Registration successful!');
      })
      .catch((error) => {
        console.error('There was an error!', error);
        message.error('Registration failed!');
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };