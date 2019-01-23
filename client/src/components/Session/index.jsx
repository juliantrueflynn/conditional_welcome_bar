import React, { Component } from 'react';
import {
  Layout,
  Page,
  Card,
  Button,
  Form,
  FormLayout,
  TextField,
} from '@shopify/polaris';

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = { shop: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { signUp } = this.props;
    const { shop } = this.state;
    signUp({ shop });
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
              <Form onSubmit={this.handleSubmit}>
                <FormLayout>
                  <TextField
                    value={this.state.shop}
                    placeholder="example.myshopify.com"
                    onChange={this.valueUpdater('shop')}
                  />
                  <Button primary>Install</Button>
                </FormLayout>
              </Form>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );
  }
}

export default Session;