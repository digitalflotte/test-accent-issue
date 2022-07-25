export const fetchTicketCategegoriesQuery = `
  query{
    ticketCategories {
      id
      Name
    }
  }
`

export const fetchTicketsQuery = `
  query($email: String){
    tickets(where: {email: $email}, sort: "createdAt:desc") {
      id
      Number
      email
      ticket_category { Name }
      Subject
      Description
      Serial_number
      Software_version
      Closed
      Need_to_answer
      createdAt
      Attached_files
      Comments {
        id
      }
    }
  }
`

export const fetchTicketQuery = `
  query($id: ID!){
    ticket(id: $id) {
      id
      Number
      email
      ticket_category { Name }
      Subject
      Description
      Serial_number
      Software_version
      Closed
      Need_to_answer
      createdAt
      Attached_files
      Comments {
        Author
        Comment
        Date
        Attachments {id, url, name}
      }
    }
  }
`

export const createTicketQuery = `
  mutation($email: String!, $subject: String!, $ticket_category: ID, $description: String, $serial_number: String!, $software_version: String) {
    createTicket(
      input: {
        data: {
          email: $email
          Subject: $subject
          ticket_category: $ticket_category
          Description: $description
          Serial_number: $serial_number
          Software_version: $software_version
        }
      }
    ) {
      ticket {
        id
      }
    }
  }
`

export const updateTicketCommentsQuery = `
  mutation($id: ID!, $comments: [editComponentContentTicketCommentInput]) {
    updateTicket(
      input: {
        where: {id: $id}
        data: {
          Comments: $comments
          Need_to_answer: true
          Closed: false
        }
      }
    ) {
      ticket {
        Comments {
          id
        }
      }
    }
  }
`

export const updateTicketAttachmentsQuery = `
  mutation($id: ID!, $attachments: String) {
    updateTicket(
      input: {
        where: {id: $id}
        data: {
          Attached_files: $attachments
        }
      }
    ) {
      ticket {
        id
      }
    }
  }
`

export const fetchUserQuery = `
  query($firebase_uid: String){
    webshopUsers(where: {firebase_uid: $firebase_uid}) {
      id
      firebase_uid
      Name
      Email
      Phone
      Billing_name
      Billing_country
      Billing_zip
      Billing_city
      Billing_address
      Shipping_name
      Shipping_country
      Shipping_zip
      Shipping_city
      Shipping_address
    }
  }
`

export const createUserQuery = `
  mutation($firebase_uid: String!, $email: String!, $name: String) {
    createWebshopUser(
      input: {
        data: {
          firebase_uid: $firebase_uid
          Email: $email
          Name: $name
        }
      }
    ) {
      webshopUser {
        id
        firebase_uid
        Email
        Name
      }
    }
  }
`

export const updateUserQuery = `
  mutation(
      $id: ID!, 
      $name: String, $email: String, $phone: String,
      $billing_name: String, $billing_country: String, $billing_zip: String, $billing_city: String, $billing_address: String,
      $shipping_name: String, $shipping_country: String, $shipping_zip: String, $shipping_city: String, $shipping_address: String
    ) {
    updateWebshopUser(
      input: {
        where: {id: $id}
        data: {
          Name: $name
          Email: $email
          Phone: $phone
          Billing_name: $billing_name
          Billing_country: $billing_country
          Billing_zip: $billing_zip
          Billing_city: $billing_city
          Billing_address: $billing_address
          Shipping_name: $shipping_name
          Shipping_country: $shipping_country
          Shipping_zip: $shipping_zip
          Shipping_city: $shipping_city
          Shipping_address: $shipping_address
        }
      }
    ) {
      webshopUser {
        id
        firebase_uid
        Name
        Email
        Phone
        Billing_name
        Billing_country
        Billing_zip
        Billing_city
        Billing_address
        Shipping_name
        Shipping_country
        Shipping_zip
        Shipping_city
        Shipping_address
      }
    }
  }
`

export const createOrderQuery = `
  mutation(
    $webshop_user: ID, 
    $name: String, $email: String, $phone: String, $comment: String,
    $billing_name: String, $billing_country: String, $billing_zip: String, $billing_city: String, $billing_address: String,
    $shipping_name: String, $shipping_country: String, $shipping_zip: String, $shipping_city: String, $shipping_address: String,
    $delivery_mode: String, $payment_mode: String,
    $shipping_cost: Float!
  ) {
    createWebshopOrder(
      input: {
        data: {
          webshop_user: $webshop_user
          Name: $name
          Email: $email
          Phone: $phone
          Comment: $comment
          Billing_name: $billing_name
          Billing_country: $billing_country
          Billing_zip: $billing_zip
          Billing_city: $billing_city
          Billing_address: $billing_address
          Shipping_name: $shipping_name
          Shipping_country: $shipping_country
          Shipping_zip: $shipping_zip
          Shipping_city: $shipping_city
          Shipping_address: $shipping_address
          Delivery_mode: $delivery_mode
          Payment_mode: $payment_mode
          Number: 0
          Shipping_cost: $shipping_cost
        }
      }
    ) {
      webshopOrder {
        id
      }
    }
  }
`

export const createOrderItemQuery = `
  mutation(
    $webshop_order: ID, $item_number: String!, $name: String!, $quantity: Int!, $price: Float!
  ) {
    createWebshopOrderItem(
      input: {
        data: {
          webshop_order: $webshop_order
          Item_number: $item_number
          Name: $name
          Quantity: $quantity
          Price: $price
        }
      }
    ) {
      webshopOrderItem {
        id
      }
    }
  }
`

export const updateOrderQuery = `
  mutation($id: ID!, $details: JSON) {
    updateWebshopOrder(
      input: {
        where: {id: $id}
        data: {
          Paypal: $details
        }
      }
    ) {
      webshopOrder {
        id
      }
    }
  }
`
