import { Button, Group, Paper, SimpleGrid, Text, Textarea, TextInput } from '@mantine/core';
import classes from '../../Components/GetInTouch/GetInTouch.module.css';
import { ContactIconsList } from '../../Components/GetInTouch/ContactIconList';
import Footer from '../../Components/Footer/Footer';
import PrimarySearchAppBar from '../../Components/NavBar/Navbar';

function ContactUsPage() {
  return (
    <>
    <PrimarySearchAppBar></PrimarySearchAppBar>
    <div style={{display:"flex", justifyContent:"center", margin:"150px 0px"}}>
        <Paper maw={800} shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts} style={{ backgroundColor:"rgb(0, 130, 140)" }}>
          <Text fz="lg" fw={700} className={classes.title} c="#fff">
            Contact information
          </Text>
           <ContactIconsList></ContactIconsList>
        </div>

        <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
          <Text fz="lg" fw={700} className={classes.title}>
            Get in touch
          </Text>

          <div className={classes.fields}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput label="Your name" placeholder="Your name" />
              <TextInput label="Your email" placeholder="hello@mantine.dev" required />
            </SimpleGrid>

            <TextInput mt="md" label="Subject" placeholder="Subject" required />

            <Textarea
              mt="md"
              label="Your message"
              placeholder="Please include all relevant information"
              minRows={3}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" className={classes.control}>
                Send message
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
    </div>
    
    <Footer></Footer>
    </>
  );
}

export default ContactUsPage