import { StyleSheet, Image } from 'react-native';



export default function LogoImage({ LogoImageSource }) {
  return (
    <Image source={LogoImageSource} style={styles.image} />

  );
}

const styles = StyleSheet.create({
  image: {
  resizeMode: 'contain',
width: 300,
  },
});
