const Profile = () => {
  const { user } = useOutletContext();
  // console.log(user);
  const { name, lastName, email, location } = user.user;
  // console.log(name);
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>

        <div className="form-center">
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          {/* <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "save changes"}
          </button> */}
          <SubmitBtn formBtn submitTxt="Update Profile" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
