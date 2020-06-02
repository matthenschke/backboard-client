export default {
  palette: {
    primary: {
      main: "#17408B",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#C9082A",
      contrastText: "#ffffff",
    },
  },
  root: {
    typography: {
      useNextVariants: true,
    },
    main: {
      textAlign: "center",
    },
    title: {
      margin: "50px 0",
    },

    textField: {
      margin: "10px 0",
    },
    button: {
      margin: "20px auto",
      justifyContent: "center",
      display: "flex",
      position: "relative",
    },
    progress: {
      position: "absolute",
    },
    error: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    profileImg: {
      maxWidth: 200,
      height: 200,
      borderRadius: "50%",
      objectFit: "cover",
    },
    dialogContent: {
      padding: 20,
    },
    closeBtn: {
      position: "absolute",
      left: "90%",
    },
    expandBtn: {
      position: "absolute",
      left: "90%",
    },
    spinnerWrapper: {
      textAlign: "center",
      marginTop: 50,
      marginBottom: 50,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0, 0.1)",
      marginBottom: 20,
    },
    commentImg: {
      maxWidth: "100%",
      height: 100,
      objectFit: "cover",
      borderRadius: "50%",
    },
    commentData: {
      marginLeft: 20,
    },
  },
};
