import PDFDocument from 'pdfkit';

const generateInvoice = async (paymentData) => {
  try {
    console.log('📄 Starting invoice generation with data:', {
      orderId: paymentData.orderId,
      userId: paymentData.user?._id,
      userName: paymentData.user?.name,
      courseId: paymentData.course?._id,
      courseTitle: paymentData.course?.title,
      amount: paymentData.amount,
      gpayTransactionId: paymentData.gpayTransactionId
    });

    // Validate required data
    if (!paymentData.orderId || !paymentData.user || !paymentData.course) {
      throw new Error('Missing required invoice data');
    }

  const {
    orderId,
    user,
    course,
    amount,
    gpayTransactionId,
    verifiedAt,
    paidAt
  } = paymentData;

  // Create a PDF document
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50
  });

  // Create a buffer to store the PDF
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  // Return a promise that resolves with the PDF buffer
  return new Promise((resolve, reject) => {
    doc.on('end', () => {
      try {
        const pdfBuffer = Buffer.concat(buffers);
        console.log('📄 PDF generation completed, size:', pdfBuffer.length, 'bytes');
        resolve(pdfBuffer);
      } catch (error) {
        reject(error);
      }
    });

    // Add company logo
    try {
      console.log('🖼️ Attempting to add company logo...');
      doc.image('public/images/Stemelix-email-logo.jpg', 50, 45, { width: 150 });
      console.log('✅ Logo added successfully');
    } catch (error) {
      console.error('❌ Error adding logo:', error);
      // Continue without the logo rather than failing the whole process
    }

    // Add invoice title
    doc.fontSize(20)
       .text('INVOICE', 50, 200);

    // Add invoice details
    doc.fontSize(10)
       .text(`Invoice Number: INV-${orderId}`, 50, 230)
       .text(`Date: ${new Date(paidAt).toLocaleDateString()}`, 50, 245)
       .text(`Transaction ID: ${gpayTransactionId}`, 50, 260);

    // Add user details section
    doc.fontSize(12)
       .text('Student Details:', 50, 300)
       .fontSize(10)
       .text(`Name: ${user.name}`, 50, 320)
       .text(`Email: ${user.email}`, 50, 335);

    // Add course details section
    doc.fontSize(12)
       .text('Course Details:', 50, 370)
       .fontSize(10)
       .text(`Course: ${course.title}`, 50, 390)
       .text(`Amount: ₹${amount}`, 50, 405);

    // Add payment details
    doc.fontSize(12)
       .text('Payment Information:', 50, 440)
       .fontSize(10)
       .text(`Payment Status: Verified`, 50, 460)
       .text(`Payment Date: ${new Date(paidAt).toLocaleString()}`, 50, 475)
       .text(`Verification Date: ${new Date(verifiedAt).toLocaleString()}`, 50, 490);

    // Add footer
    doc.fontSize(8)
       .text('This is a computer-generated invoice and requires no signature.', 50, 700)
       .text('For any queries, please contact support@stemelix.com', 50, 715);

    // Finalize the PDF
    doc.end();
  });
  } catch (error) {
    console.error('❌ Error generating invoice:', error);
    throw error;
  }
};

export default generateInvoice;