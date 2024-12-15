from rest_framework.response import Response
from rest_framework import status


def validate_required_fields(required_fields, data):
    """
    Validate that all required fields are present and non-empty in the data.

    :param required_fields: List of required field names.
    :param data: Dictionary-like object to validate (e.g., request.data).
    :return: Response with error message if validation fails, otherwise None.
    """
    for field in required_fields:
        if field not in data or not data.get(field):
            return Response(
                {"error": f"{field.capitalize().replace('_', ' ')} field is required"},
                status=status.HTTP_428_PRECONDITION_REQUIRED
            )
    return None
