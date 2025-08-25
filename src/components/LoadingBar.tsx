import React from "react";
import styles from "@styles/LoadingBar.module.scss";

interface LoadingBarProps {
  loading: boolean;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ loading }) => {
  return (
    <div
      className={`${styles.loadingBar} ${loading ? styles.isLoading : ""}`}
      style={{
        width: loading ? "100%" : "0%",
        opacity: loading ? 1 : 0,
        height: loading ? "4px" : "0",
      }}
    />
  );
};

export default LoadingBar;
