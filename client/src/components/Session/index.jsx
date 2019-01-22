import React, { Component } from 'react';
import {
  Layout,
  Page,
  Card,
  Button,
  FormLayout,
  TextField,
} from '@shopify/polaris';

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      email: '',
    };
  }

  valueUpdater(field) {
    return value => this.setState({ [field]: value });
  }

  render() {
    return (
      <Page title="Login">
        <Layout>
          <Layout.AnnotatedSection
            title="Form"
            description="A sample form using Polaris components."
          >
            <Card sectioned>
              <FormLayout>
                <FormLayout.Group>
                  <TextField
                    value={this.state.first}
                    label="First Name"
                    placeholder="Tom"
                    onChange={this.valueUpdater('first')}
                  />
                  <TextField
                    value={this.state.last}
                    label="Last Name"
                    placeholder="Ford"
                    onChange={this.valueUpdater('last')}
                  />
                </FormLayout.Group>
                <TextField
                  value={this.state.email}
                  label="Email"
                  placeholder="example@email.com"
                  onChange={this.valueUpdater('email')}
                />
                <TextField
                  multiline
                  label="How did you hear about us?"
                  placeholder="Website, ads, email, etc."
                  value={this.state.autoGrow}
                  onChange={this.valueUpdater('autoGrow')}
                />
                <Button primary>Submit</Button>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );
  }
}

export default Session;